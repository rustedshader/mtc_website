"use client";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

const TypedText = () => {
  const el = useRef<HTMLDivElement | null>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    typed.current = new Typed(el.current, {
      strings: [
        'Welcome To,<br/><span style="color: #F25022">Microsoft</span><br/><span style="color: #7FBA00">Technical</span><br/><span style="color: #00A4EF">Community.</span>',
      ],
      typeSpeed: 100,
    });

    // Cleanup function to destroy Typed instance
    return () => {
      typed.current?.destroy();
    };
  }, []);

  return <span ref={el} />;
};

export default TypedText;
