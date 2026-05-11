export default function PropertyMap({ address }) {
	const query = encodeURIComponent(`${address}, Buenos Aires, Argentina`);
	return (
		<iframe
			title={`Mapa de ${address}`}
			src={`https://www.google.com/maps?q=${query}&output=embed`}
			className="property-map"
			loading="lazy"
		/>
	);
}
