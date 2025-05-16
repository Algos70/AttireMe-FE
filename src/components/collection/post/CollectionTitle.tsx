import React from 'react';

const CollectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <div className="text-2xl sm:text-3xl font-bold text-black mb-8 text-center">{title}</div>
);

export default CollectionTitle; 