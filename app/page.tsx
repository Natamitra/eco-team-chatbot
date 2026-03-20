'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_QUESTIONS = [
  'Jakie mam benefity?',
  'Jak zgłosić nieobecność?',
  'Kto jest w HR?',
  'Czym zajmuje się firma?',
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Cześć! Jestem Twoim asystentem onboardingowym w ECO-TEAM 🌱\n\nJestem tu, żeby pomóc Ci odnaleźć się w firmie. Możesz zapytać mnie o benefity, urlopy, kontakty, regulaminy i wiele więcej.\n\nO co chcesz wiedzieć?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Przepraszam, coś poszło nie tak. Spróbuj ponownie.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-[#1a3a2a] text-white px-4 py-3 flex items-center gap-3 shadow">
        <div className="w-9 h-9 rounded-full bg-[#4a9e6a] flex items-center justify-center text-lg">🌱</div>
        <div>
          <div className="font-medium text-sm">Asystent Onboardingu — ECO-TEAM</div>
          <div className="text-xs text-green-300">● online</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-[#4a9e6a] flex items-center justify-center text-sm flex-shrink-0">🌱</div>
            )}
            <div className={`max-w-[75%] px-4 py-2.5 text-sm rounded-2xl whitespace-pre-wrap leading-relaxed ${
              msg.role === 'user'
                ? 'bg-[#1a3a2a] text-white rounded-br-sm'
                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full bg-[#4a9e6a] flex items-center justify-center text-sm">🌱</div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {QUICK_QUESTIONS.map((q) => (
            <button key={q} onClick={() => sendMessage(q)}
              className="text-xs px-3 py-1.5 rounded-full border border-[#1a3a2a] text-[#1a3a2a] hover:bg-green-50 transition">
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="px-4 pb-5 pt-2 bg-white border-t border-gray-200 flex gap-2">
        <input
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-green-500"
          placeholder="Zadaj pytanie..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          disabled={loading}
        />
        <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading}
          className="w-9 h-9 rounded-full bg-[#1a3a2a] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#2a5a3a] transition">
          ↑
        </button>
      </div>
    </div>
  );
}