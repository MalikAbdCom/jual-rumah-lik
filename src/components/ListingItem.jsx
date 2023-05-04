export const ListingItem = ({listing, id}) => {
    return (
        <div>
            <p>{id}</p>
            <p>{listing.name}</p>
        </div>
    )
};