'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { PublicAthlete } from '@/lib/team';

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
          <Image src={member.imageUrl} alt={member.imageAlt ?? member.name} fill className="object-cover" sizes="112px" />
        ) : (
          member.name.charAt(0)
        )}
      </div>
      <h3 className="mb-2 text-lg font-bold text-text-primary">{member.name}</h3>
      <RoleBadge role={member.role} />
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-secondary">{member.bio}</p>
    </button>
  );
}

function MemberModal({ member, onClose }: { member: PublicAthlete; onClose: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-brand-navy/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Información de ${member.name}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-2xl border border-white/30 bg-brand-blue-pale shadow-2xl md:grid-cols-[1.05fr_0.95fr]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/85 text-xl font-medium text-brand-navy shadow-md shadow-brand-navy/10 backdrop-blur-sm transition-colors hover:bg-white hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        >
          ×
        </button>

        <div className="relative flex min-h-[320px] items-center justify-center bg-brand-navy/10 md:min-h-[540px]">
          {member.imageUrl ? (
            <Image
              src={member.imageUrl}
              alt={member.imageAlt ?? member.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 52vw"
              priority
            />
          ) : (
            <span className="text-8xl font-black text-brand-blue/60">{member.name.charAt(0)}</span>
          )}
        </div>

        <div className="flex flex-col justify-start p-7 pt-14 sm:p-10 sm:pt-16 lg:p-12 lg:pt-20">
          <h2 className="text-3xl font-black text-brand-navy sm:text-4xl">{member.name}</h2>
          <p className="mt-2 text-sm font-semibold text-brand-blue sm:text-base">{member.role}</p>
          <div className="my-6 h-1 w-16 rounded-full bg-brand-blue" />
          <p className="whitespace-pre-line text-base leading-relaxed text-text-secondary sm:text-lg">{member.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default function TeamMemberGrid({ members }: { members: PublicAthlete[] }) {
  const [selectedMember, setSelectedMember] = useState<PublicAthlete | null>(null);
  const coaches = members.filter((member) => member.role === 'Entrenador');
  const athletes = members.filter((member) => member.role !== 'Entrenador');

  return (
    <>
      <div className="space-y-10">
        {coaches.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {coaches.map((coach) => (
              <div key={coach.id} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.5rem)]">
                <MemberCard member={coach} onOpen={() => setSelectedMember(coach)} />
              </div>
            ))}
          </div>
        )}

        {athletes.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {athletes.map((athlete) => (
              <MemberCard key={athlete.id} member={athlete} onOpen={() => setSelectedMember(athlete)} />
            ))}
          </div>
        )}
      </div>

      {selectedMember && <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
    </>
  );
}
