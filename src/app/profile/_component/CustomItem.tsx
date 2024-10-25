interface CustomItemProps {
  children: React.ReactNode;
}

const CustomItem = ({ children }: CustomItemProps) => {
  return (
    <div className="bg-slate-200 shadow rounded-lg p-4 mb-4 laptop:w-[60dvw] h-auto">
      {children}
    </div>
  );
};

export default CustomItem;
