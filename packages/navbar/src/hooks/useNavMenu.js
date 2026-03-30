import { useState } from 'react';

export const useNavMenu = () => {
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(o => !o);
    const close = () => setOpen(false);

    return { open, toggle, close };
};
