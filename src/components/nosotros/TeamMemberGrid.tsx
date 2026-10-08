'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { PublicAthlete } from '@/lib/team';

const pageSize = 8;
const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'coaches', label: 'Entrenadores' },
  { id: 'athletes', label: 'Atletas' },
] as const;

type TeamFilter = (typeof filters)[number]['id'];

function MemberCard({ member, onOpen }: { member: PublicAthlete; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ver información de ${member.name}`}
      className="group h-full w-full cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white text-left shadow-sm transition-shadow hover:shadow-lg hover:shadow-slate-900/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900"
    >
      <div className="relative flex aspect-[6/5] items-center justify-center overflow-hidden bg-slate-200 text-5xl font-bold text-slate-500">
        {member.imageUrl ? (
          <Image
            src={member.imageUrl}
            alt={member.imageAlt ?? member.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          member.name.charAt(0)
        )}
      </div>
      <div className="flex items-center justify-between gap-3 p-5">
        <div className="min-w-0">
          <h3 className="break-words text-xl font-bold text-slate-950">{member.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{member.role}</p>
        </div>
        <span aria-hidden="true" className="shrink-0 text-xl text-slate-700">→</span>
      </div>
    </button>
  );
}

function MemberModal({ member, onClose }: { member: PublicAthlete; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Información de ${member.name}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative grid max-h-[calc(100dvh-2rem)] w-full max-w-4xl overflow-y-auto rounded-xl bg-white shadow-2xl md:grid-cols-2">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-xl font-medium text-slate-900 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          ×
        </button>

        <div className="relative flex aspect-square items-center justify-center bg-slate-200">
          {member.imageUrl ? (
            <Image
              src={member.imageUrl}
              alt={member.imageAlt ?? member.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 448px"
            />
          ) : (
            <span className="text-8xl font-bold text-slate-500">{member.name.charAt(0)}</span>
          )}
        </div>

        <div className="flex flex-col justify-center p-6 md:p-10 md:pt-16">
          <p className="mb-4 text-xs font-bold tracking-[0.4em] text-slate-500">THEIA</p>
          <h2 className="break-words text-3xl font-bold text-slate-950 sm:text-4xl">{member.name}</h2>
          <p className="mt-2 text-sm font-medium text-slate-500">{member.role}</p>
          <p className="mt-6 whitespace-pre-line text-justify text-base leading-relaxed text-slate-600">{member.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default function TeamMemberGrid({ members }: { members: PublicAthlete[] }) {
  const [selectedMember, setSelectedMember] = useState<PublicAthlete | null>(null);
  const [filter, setFilter] = useState<TeamFilter>('all');
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const filteredMembers = members.filter((member) => {
    if (filter === 'coaches') return member.role === 'Entrenador';
    if (filter === 'athletes') return member.role !== 'Entrenador';
    return true;
  });

  return (
    <>
      <div className="mb-6 flex flex-wrap justify-center gap-x-6 gap-y-2 sm:justify-start sm:gap-x-8">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={filter === item.id}
            onClick={() => {
              setFilter(item.id);
              setVisibleCount(pageSize);
            }}
            className={`rounded-sm py-2 text-sm transition-colors hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900 sm:text-base ${filter === item.id ? 'font-bold text-slate-950' : 'font-medium text-slate-500'}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredMembers.slice(0, visibleCount).map((member) => (
            <MemberCard key={member.id} member={member} onOpen={() => setSelectedMember(member)} />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-slate-500">No hay integrantes en esta categoría.</p>
      )}

      {visibleCount < filteredMembers.length && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + pageSize)}
            className="rounded-lg border border-slate-400 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900"
          >
            Ver más {filter === 'athletes' ? 'atletas' : filter === 'coaches' ? 'entrenadores' : 'integrantes'}
          </button>
        </div>
      )}

      {selectedMember && <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
    </>
  );
}
