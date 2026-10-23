import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
import * as jsx from 'react/jsx-runtime';

const source = await readFile(new URL('../src/components/profile/ProfileAvatar.tsx', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: {
  module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX,
} }).outputText;

function loadAvatar() {
  let failedImage = null;
  const Image = () => null;
  const modules = {
    'react/jsx-runtime': jsx,
    react: { useState: () => [failedImage, (value) => { failedImage = value; }] },
    'next/image': { default: Image },
  };
  const exports = {};
  vm.runInNewContext(compiled, { exports, require: (name) => {
    assert.ok(name in modules, `Unexpected module: ${name}`);
    return modules[name];
  } });
  return { render: exports.default, Image };
}

test('Google photos use the server image optimizer while uploaded avatars retain immediate refresh', () => {
  const { render, Image } = loadAvatar();
  const google = render({ image: 'https://lh3.googleusercontent.com/a/example=s96-c', name: 'Jean', sizes: '36px' });
  assert.equal(google.type, Image);
  assert.equal(google.props.unoptimized, false);
  for (const image of ['/api/uploads/profiles/athlete.jpg?v=2', '/uploads/profiles/legacy.jpg?v=3']) {
    const avatar = render({ image, name: 'Jean', sizes: '112px' });
    assert.equal(avatar.props.src, image);
    assert.equal(avatar.props.unoptimized, true);
  }
});

test('a failed photo shows initials and a new photo can load without reloading the page', () => {
  const { render, Image } = loadAvatar();
  const props = { image: '/api/uploads/profiles/user.jpg?v=1', name: ' Jean ', sizes: '40px' };
  render(props).props.onError();
  const fallback = render(props);
  assert.equal(fallback.type, 'span');
  assert.equal(fallback.props.children, 'J');
  assert.equal(fallback.props['aria-label'], 'Jean');
  assert.equal(render({ ...props, image: '/api/uploads/profiles/user.jpg?v=2' }).type, Image);
});

test('profiles without a photo show initials without requesting an empty image', () => {
  const { render } = loadAvatar();
  assert.equal(render({ name: ' Ángela ', sizes: '36px' }).props.children, 'Á');
  assert.equal(render({ image: '', name: '', sizes: '36px' }).props.children, 'A');
});
