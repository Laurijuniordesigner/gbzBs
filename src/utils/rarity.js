export const RARITIES = [
  { max: 10, name: 'COMUM', cls: 'common', color: '#aaaabb' },
  { max: 20, name: 'RARA', cls: 'rare', color: '#00d0ff' },
  { max: 50, name: 'SUPER', cls: 'super', color: '#ffd700' },
  { max: Infinity, name: 'LENDÁRIA', cls: 'legendary', color: '#ff0044' },
];

export function getRarity(price) {
  const p = Number(price) || 0;
  return RARITIES.find(r => p <= r.max) || RARITIES[RARITIES.length - 1];
}

export function getFeatures(service) {
  return service.features || [
    'Serviço profissional',
    'Prazo combinado',
    'Conta protegida',
    'Suporte via WhatsApp',
  ];
}
