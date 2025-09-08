import css from './InfoMessage.module.css';

interface InfoMessageProps {
  children: React.ReactNode;
}

const InfoMessage = ({ children }: InfoMessageProps) => {
  return (
    <div className={css.infoBlock} data-aos='fade-up'>
      <h2 className={css.infoMessage}>{children}</h2>
    </div>
  );
};

export default InfoMessage;
