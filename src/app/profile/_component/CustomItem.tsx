interface CustomItemProps {
  children: React.ReactNode;
}

const CustomItem = ({ children }: CustomItemProps) => {
  return (
    <div
      className={
        'flex flex-col bg-slate-200 shadow rounded-lg p-4 mb-4 laptop:w-[30rem] desktop:w-[40rem] h-auto mx-auto'
      }
    >
      {children}
    </div>
  );
};

export default CustomItem;
