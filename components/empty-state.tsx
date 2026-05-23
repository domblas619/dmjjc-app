type EmptyStateProps = {
  title: string;
  message: string;
};

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="border border-academy-line/10 bg-academy-panel p-5 md:p-7">
      <p className="text-xs font-black uppercase tracking-[.22em] text-academy-blue">Nothing Posted</p>
      <h3 className="mt-4 font-display text-2xl font-black uppercase leading-none text-academy-foreground sm:text-3xl">{title}</h3>
      <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-academy-mist">{message}</p>
    </div>
  );
}
