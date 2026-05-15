export default function PropertyMap({ address = "Morón, Buenos Aires" }) {
	const query = encodeURIComponent(address);
	const src = `https://maps.google.com/maps?q=${query}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

	return (
		<div className="overflow-hidden rounded-[20px] p-0">
			<iframe
				title={`Ubicación de ${address}`}
				src={src}
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
				className="h-full min-h-[420px] w-full border-0"
			/>
		</div>
	);
}
