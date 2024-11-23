import * as Icons from "react-icons/tb";

export default function Icon({
	name,
	className,
}) {
	const allIcons = Icons;
	if (!allIcons[name]) return <Icons.TbError404 className={className ?? ""} />;
	const QueryIcon = allIcons[name];
	return <QueryIcon className={className ?? ""} />;
}
