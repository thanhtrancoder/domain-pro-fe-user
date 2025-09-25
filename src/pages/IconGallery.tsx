import * as Icon from "../components/icons/Icon";

const ICONS = Object.entries(Icon).filter(
  ([_name, comp]) => typeof comp === "function",
) as [string, React.FC<{ className?: string }>][];

const IconGallery: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-3">
      {ICONS.map(([name, IconComponent]) => (
        <div
          key={name}
          className="flex flex-col items-center justify-center space-y-1 rounded border p-2"
        >
          <IconComponent className="h-8 w-8 text-gray-700" />
          <span className="text-xs text-gray-600">{name}</span>
        </div>
      ))}
    </div>
  );
};

export default IconGallery;
