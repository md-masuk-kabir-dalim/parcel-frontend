function calculateDistance(coord1?: number[], coord2?: number[]) {
    if (!coord1 || !coord2 || coord1.length < 2 || coord2.length < 2) return 0;

    const [lng1, lat1] = coord1 as [number, number];
    const [lng2, lat2] = coord2 as [number, number];

    const toRad = (val: number) => (val * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default calculateDistance;
