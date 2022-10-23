import { useEffect, useState } from 'react';

interface Props {
    children: JSX.Element;
    delay: number;
}

const DelayWrapper = ({ children, delay }: Props) => {
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsShown(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    return isShown ? children : null;
};

export default DelayWrapper;
