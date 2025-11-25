'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NotFoundOverlay } from '@/components/overlays/NotFoundOverlay';

export default function NotFound() {
  const [showOverlay, setShowOverlay] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div>
      <NotFoundOverlay isVisible={showOverlay} onClose={handleClose} />
    </div>
  );
}
