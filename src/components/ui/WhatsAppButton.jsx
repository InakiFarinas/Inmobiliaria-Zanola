import WhatsAppIcon from "../icons/WhatsAppIcon";
import { WHATSAPP_URL } from "../../config/contact";
import Button from "./Button";

export default function WhatsAppButton({
	message,
	children,
	className = "",
	iconSize = 18,
	...props
}) {
	return (
		<Button
			href={WHATSAPP_URL(message)}
			target="_blank"
			rel="noreferrer"
			variant="whatsapp"
			className={className}
			{...props}
		>
			<WhatsAppIcon size={iconSize} />
			<span>{children}</span>
		</Button>
	);
}
