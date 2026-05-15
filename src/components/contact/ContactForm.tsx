'use client';

import { useState } from 'react';
import type { ContactFormData, ApiResponse } from '@/types';
import Button from '@/components/ui/Button';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error'); setErrorMessage('Todos los campos son obligatorios.'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus('error'); setErrorMessage('Por favor ingresa un email válido.'); return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
      });
      const data: ApiResponse = await response.json();
      if (data.success) { setStatus('success'); setFormData({ name: '', email: '', message: '' }); }
      else { setStatus('error'); setErrorMessage(data.message || 'Error al enviar.'); }
    } catch { setStatus('error'); setErrorMessage('Error de conexión.'); }
  };

  const inputClasses = 'w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all duration-200';

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="block text-text-primary text-sm font-medium mb-2">Nombre completo</label>
        <input id="contact-name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Tu nombre" required className={inputClasses} />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-text-primary text-sm font-medium mb-2">Correo electrónico</label>
        <input id="contact-email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="tu@email.com" required className={inputClasses} />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-text-primary text-sm font-medium mb-2">Mensaje</label>
        <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} placeholder="Cuéntanos en qué podemos ayudarte..." rows={5} required className={`${inputClasses} resize-none`} />
      </div>

      {status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
          ¡Mensaje enviado con éxito! Te responderemos pronto.
        </div>
      )}
      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{errorMessage}</div>
      )}

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={status === 'loading'}>
        {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
      </Button>
    </form>
  );
}
