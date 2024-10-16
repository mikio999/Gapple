import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

interface TypingEffectProps {
  text: string;
}

const TypingEffect = ({ text }: TypingEffectProps) => {
  const charactersWithUUID = Array.from(text).map((char) => ({
    char,
    id: uuidv4(),
  }));

  return (
    <motion.div
      className={'inline-block'}
      style={{ whiteSpace: 'pre-wrap', wordBreak: 'keep-all' }}
      initial={'hidden'}
    >
      {charactersWithUUID.map(({ char, id }, index) => (
        <motion.span
          key={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: index * 0.05,
            duration: 0.1,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TypingEffect;
