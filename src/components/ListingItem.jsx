import {Link} from "react-router-dom";
import TimeAgo from "react-timeago";
import indoStrings from "react-timeago/lib/language-strings/id";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import {MdLocationOn} from "react-icons/md";
import {FaTrash} from 'react-icons/fa'
import {BsPencilSquare} from 'react-icons/bs'

const ListingItem = ({listing, id, onDelete, onEdit}) => {
    const formatter = buildFormatter(indoStrings);
    const fromDate = listing.timestamp.toDate().toString();

    const harga = [listing.regularPrice, listing.discountedPrice];
    const hasilConvertHarga = harga.map((item) => {
        return new Intl.NumberFormat("en-US", {
            style: "decimal",
            minimumFractionDigits: 2,
        }).format(item);
    });
    const hargaDiTampilkan = function () {
        const hargaAkhir = listing.discountedPrice
            ? hasilConvertHarga[1]
            : hasilConvertHarga[0];

        const penambahanStatus = listing.type === "rent" ? "/month" : "";

        return hargaAkhir + penambahanStatus;
    };

    return (
        <li className="relative bg-white text-teal-900 mb-8 flex flex-col justify-between shadow-blue-400 shadow-md rounded overflow-hidden transition duration-300 max-w-[300px]">
            <div className='px-1 pb-2 pt-1'>
                <Link to={`/category/${listing.type}/${id}`}>
                    <div className="h-[170px] overflow-hidden">
                        <img
                            className="w-full h-[170px] transition hover:scale-110 duration-150 object-cover"
                            src={listing.imgUrls[0]}
                            alt={listing.name}
                        />
                    </div>
                    <TimeAgo
                        date={fromDate}
                        formatter={formatter}
                        className="absolute top-2 left-2 px-2 py-1 bg-blue-500 text-white font-semibold capitalize text-xs rounded shadow shadow-blue-300"
                    />

                    <div className="flex gap-1 items-center text-sm">
                        <p>
                            <MdLocationOn className="text-blue-500 text-md"/>
                        </p>
                        <p className="truncate">{listing.address}</p>
                    </div>

                    <h3 className="text-xl font-semibold text-teal-800">
                        {listing.name}
                    </h3>
                    <p className="text-red-400 font-bold">Rp. {hargaDiTampilkan()}</p>


                    <div className="flex gap-2 text-sm mt-1">
                        <p>{`${listing.bedrooms} Kamar`}</p>
                        <p>{`${listing.bathrooms} WC`}</p>
                    </div>
                </Link>
                <div className="flex gap-1 absolute right-1.5 bottom-1.5 z-50">
                    {
                        onEdit && (
                            <BsPencilSquare
                                onClick={onEdit}
                                className="p-1 border-2 rounded text-3xl hover:cursor-pointer"/>
                        )
                    }
                    {
                        onDelete && (
                            <FaTrash
                                onClick={onDelete}
                                className="p-1 text-red-500 border-2 rounded text-3xl hover:cursor-pointer"/>
                        )
                    }
                </div>
            </div>
        </li>
    );
};

export default ListingItem;
