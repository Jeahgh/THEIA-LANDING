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

function RoleBadge({ role }: { role: string }) {
  const isCoach = role === 'Entrenador';

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${isCoach ? 'bg-brand-navy text-white' : 'bg-brand-blue/10 text-brand-blue'}`}>
      {role}
    </span>
  );
}

function MemberCard({ member, onOpen }: { member: PublicAthlete; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ver información de ${member.name}`}
      className="group h-full w-full cursor-pointer rounded-lg border border-brand-blue/15 bg-brand-blue-pale/70 p-4 text-center shadow-lg shadow-brand-blue/10 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/30 hover:bg-brand-blue-pale hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-4 sm:rounded-2xl sm:p-6"
    >
      <div className="relative mx-auto mb-4 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-white/70 text-2xl font-bold text-brand-blue ring-4 ring-brand-blue/10 ring-offset-4 ring-offset-brand-blue-pale transition-transform duration-300 group-hover:scale-105">
        {member.imageUrl ? (
          <Image
            src={member.imageUrl}
            alt={member.imageAlt ?? member.name}
            fill
            className="object-cover"
            sizes="112px"
          />
        ) : (
          member.name.charAt(0)
        )}
      </div>
      <h3 className="mb-2 break-words text-lg font-bold text-text-primary">{member.name}</h3>
      <RoleBadge role={member.role} />
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-secondary">{member.bio}</p>
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
        <div className="flex flex-wrap justify-center gap-6">
          {filteredMembers.slice(0, visibleCount).map((member) => (
            <div key={member.id} className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]">
              <MemberCard member={member} onOpen={() => setSelectedMember(member)} />
            </div>
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
