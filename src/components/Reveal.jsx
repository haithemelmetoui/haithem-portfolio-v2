import { motion, useReducedMotion } from "framer-motion";

// Quiet, once-only fade as content enters the viewport.
export default function Reveal({ as = "div", children, className, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
