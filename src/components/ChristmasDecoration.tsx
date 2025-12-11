/**
 * Componente ChristmasDecoration
 * Decorações natalinas sutis no fundo
 */

import { Sparkles } from 'lucide-react';

export default function ChristmasDecoration() {
  return (
    <>
      <div className="fixed top-20 left-4 opacity-5 pointer-events-none">
        <Sparkles className="w-24 h-24 text-christmas-red animate-float" />
      </div>
      <div className="fixed bottom-32 right-4 opacity-5 pointer-events-none" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-16 h-16 text-christmas-green animate-float" />
      </div>
      <div className="fixed top-1/3 right-8 opacity-5 pointer-events-none" style={{ animationDelay: '0.5s' }}>
        <Sparkles className="w-12 h-12 text-christmas-red animate-float" />
      </div>
    </>
  );
}
