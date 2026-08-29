'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Send } from 'lucide-react';

export function ContactForm(): React.ReactElement {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    practice: 'general',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const practiceOptions = [
    { value: 'general', label: 'Consulta General / No estoy seguro' },
    { value: 'civil', label: 'Derecho Civil / Bienes / Sucesiones' },
    { value: 'mercantil', label: 'Derecho Mercantil / Empresas' },
    { value: 'familiar', label: 'Derecho Familiar / Divorcios / Custodia' },
    { value: 'penal', label: 'Derecho Penal / Defensa Técnica' },
    { value: 'amparo', label: 'Juicio de Amparo / Constitucional' },
    { value: 'extranjeros', label: 'Consultoría para Extranjeros en México' },
  ];

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Por favor ingrese su nombre completo.';
    }
    if (!formData.contact.trim()) {
      newErrors.contact = 'Por favor ingrese un teléfono o correo de contacto.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Por favor describa brevemente su consulta.';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate reliable submission feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div className="p-8 bg-brand-canvas border border-brand-accent/40 rounded-md shadow-card text-center space-y-4 animate-in fade-in duration-300">
        <div className="w-12 h-12 mx-auto bg-brand-accent/15 text-brand-accent rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-serif font-bold text-brand-primary">
          Mensaje Recibido Correctamente
        </h3>
        <p className="text-xs sm:text-sm text-brand-text-secondary max-w-md mx-auto leading-relaxed">
          Gracias por contactar a AGORA, ABOGADOS. Un miembro de nuestro equipo legal revisará su solicitud y se comunicará con usted dentro de nuestro horario de atención.
        </p>
        <div className="pt-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', contact: '', practice: 'general', message: '' });
            }}
          >
            Enviar otro mensaje
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 sm:p-8 bg-brand-surface border border-brand-border rounded-md shadow-card space-y-5"
      aria-label="Formulario de contacto y consulta legal"
    >
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-primary mb-1">
          Formulario de Contacto
        </h2>
        <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
          Describa su asunto de forma confidencial. Responderemos a la brevedad posible.
        </p>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <Input
          id="contact-name"
          label="Nombre Completo"
          placeholder="Ej. Lic. Carlos Mendoza"
          value={formData.name}
          error={errors.name}
          required
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, name: e.target.value }));
            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
          }}
        />

        {/* Contact info (Email or Phone) */}
        <Input
          id="contact-channel"
          label="Teléfono o Correo Electrónico"
          placeholder="Ej. +52 656 000 0000 o correo@ejemplo.com"
          value={formData.contact}
          error={errors.contact}
          required
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, contact: e.target.value }));
            if (errors.contact) setErrors((prev) => ({ ...prev, contact: '' }));
          }}
        />

        {/* Practice Select */}
        <Select
          id="contact-practice"
          label="Materia Jurídica de Interés"
          options={practiceOptions}
          value={formData.practice}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, practice: e.target.value }))
          }
        />

        {/* Message */}
        <Textarea
          id="contact-message"
          label="Descripción Preliminar del Asunto"
          placeholder="Explique brevemente los hechos, antecedentes o tipo de trámite que requiere..."
          value={formData.message}
          error={errors.message}
          required
          rows={4}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, message: e.target.value }));
            if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
          }}
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          className="justify-center shadow-subtle text-xs sm:text-sm font-semibold"
        >
          {isSubmitting ? (
            <span>Enviando información...</span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>Enviar Consulta a la Firma</span>
            </span>
          )}
        </Button>
      </div>

      <p className="text-[11px] text-brand-text-muted text-center pt-2 leading-relaxed">
        Su información está protegida por secreto profesional y tratada conforme a nuestro Aviso de Privacidad.
      </p>
    </form>
  );
}
