import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GoogleIcon } from './ui/GoogleIcon';
import confetti from 'canvas-confetti';
import { STORES } from '../data/mockData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedStoreId?: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  preselectedStoreId,
}) => {
  const [storeId, setStoreId] = useState<string>(preselectedStoreId || STORES[0].id);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('19:00');
  const [guests, setGuests] = useState<number>(2);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [reservationCode, setReservationCode] = useState<string>('');

  useEffect(() => {
    if (preselectedStoreId) {
      setStoreId(preselectedStoreId);
    }
    // Default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split('T')[0]);
  }, [preselectedStoreId, isOpen]);

  const availableTimes = ['12:00', '13:30', '15:00', '16:30', '18:00', '19:30', '21:00'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'DN' + Math.floor(100000 + Math.random() * 900000);
    setReservationCode(code);
    setIsSubmitted(true);

    // Trigger celebratory confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#942225', '#ffe9e7', '#251918', '#34d399'],
    });
  };

  const selectedStore = STORES.find((s) => s.id === storeId) || STORES[0];

  const resetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden relative border border-[#8c716f]/20 my-8"
      >
        {/* Modal Header */}
        <div className="bg-[#251918] text-white p-6 md:p-8 relative">
          <button
            onClick={resetAndClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-1.5 rounded-full bg-white/10 transition-colors cursor-pointer"
          >
            <GoogleIcon name="close" size={20} />
          </button>

          <span className="text-[#ffdad7] font-mono text-[10px] uppercase tracking-[0.3em] block mb-1">
            Reserva de Mesa Exclusiva
          </span>
          <h3 className="font-serif text-2xl md:text-3xl font-bold">Di Napoli Heritage</h3>
          <p className="text-white/70 text-xs mt-1">
            Garantimos sua mesa sem filas de espera com todo o conforto.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8">
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <GoogleIcon name="check_circle" filled size={36} className="text-emerald-600" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-[#942225] block mb-1">
                Reserva Confirmada
              </span>
              <h4 className="font-serif text-3xl font-bold text-[#251918] mb-2">
                Esperamos por você!
              </h4>

              <div className="bg-[#fff8f7] border border-[#8c716f]/20 rounded-2xl p-6 my-6 text-left space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-[#8c716f]/10">
                  <span className="text-xs text-[#584140]">Código da Reserva:</span>
                  <span className="font-mono text-sm font-bold text-[#942225] bg-[#ffe9e7] px-3 py-1 rounded-md">
                    {reservationCode}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#251918]">
                  <GoogleIcon name="location_on" filled size={16} className="text-[#942225]" />
                  <span>
                    <strong>Unidade:</strong> {selectedStore.name} ({selectedStore.address})
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#251918]">
                  <GoogleIcon name="calendar_month" filled size={16} className="text-[#942225]" />
                  <span>
                    <strong>Data:</strong> {date} às {time}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#251918]">
                  <GoogleIcon name="group" filled size={16} className="text-[#942225]" />
                  <span>
                    <strong>Mesa para:</strong> {guests} {guests === 1 ? 'Pessoa' : 'Pessoas'} ({name})
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#584140] mb-6">
                Enviamos a confirmação detalhada para o e-mail <strong>{email}</strong>.
              </p>

              <button
                onClick={resetAndClose}
                className="w-full bg-[#942225] hover:bg-[#78181b] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Concluir
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Select Store */}
              <div>
                <label className="block text-xs font-semibold uppercase text-[#584140] mb-1.5 flex items-center gap-1.5">
                  <GoogleIcon name="location_on" filled size={16} className="text-[#942225]" /> Unidade
                </label>
                <select
                  value={storeId}
                  onChange={(e) => setStoreId(e.target.value)}
                  className="w-full bg-[#fff8f7] border border-[#8c716f]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#942225] text-[#251918]"
                >
                  {STORES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}, {s.neighborhood} ({s.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date, Time & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#584140] mb-1.5 flex items-center gap-1.5">
                    <GoogleIcon name="calendar_month" filled size={16} className="text-[#942225]" /> Data
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#fff8f7] border border-[#8c716f]/20 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#942225] text-[#251918]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#584140] mb-1.5 flex items-center gap-1.5">
                    <GoogleIcon name="schedule" filled size={16} className="text-[#942225]" /> Horário
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#fff8f7] border border-[#8c716f]/20 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#942225] text-[#251918]"
                  >
                    {availableTimes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#584140] mb-1.5 flex items-center gap-1.5">
                    <GoogleIcon name="group" filled size={16} className="text-[#942225]" /> Pessoas
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#fff8f7] border border-[#8c716f]/20 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#942225] text-[#251918]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Pessoa' : 'Pessoas'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#584140] mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Ana Marchi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#fff8f7] border border-[#8c716f]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#942225] text-[#251918]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#584140] mb-1">
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-8888"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#fff8f7] border border-[#8c716f]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#942225] text-[#251918]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#584140] mb-1">
                  E-mail para Confirmação
                </label>
                <input
                  type="email"
                  required
                  placeholder="ana@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#fff8f7] border border-[#8c716f]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#942225] text-[#251918]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#584140] mb-1">
                  Observações / Pedido Especial (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Comemoração de aniversário, cadeira de bebê..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-[#fff8f7] border border-[#8c716f]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#942225] text-[#251918]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#942225] hover:bg-[#78181b] text-white py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-[#942225]/20 transition-all cursor-pointer mt-2"
              >
                Confirmar Reserva sem Custos
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
