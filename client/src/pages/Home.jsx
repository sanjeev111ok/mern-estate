import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import SwiperCore from "swiper"
import "swiper/css/bundle"
import ListingItem from "../components/ListingItem"

export default function Home() {
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  SwiperCore.use([Navigation])
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4")
        const data = await res.json()
        setOfferListings(data)
        fetchRentListings()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4")
        const data = await res.json()
        setRentListings(data)
        fetchSaleListings()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4")
        const data = await res.json()
        setSaleListings(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListings()
  }, [])
  return (
    <div>
      {/*top*/}
      <div className=" flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-semibold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-500 text-xs sm:text-sm ">
          BaaGH Estate is a real estate platform that connects{" "}
          <span className="text-gray-700 font-bold">buyers</span> ,{" "}
          <span className="text-gray-700 font-bold">sellers</span>, and{" "}
          <span className="text-gray-700 font-bold">renters</span> with
          properties that meet their needs. Our mission is to make the process
          of finding and securing a property as easy and efficient as possible.
          <br />
          we have a wide range of properties available for{" "}
          <span className="text-gray-700 font-bold">sale</span> and
          <span className="text-gray-700 font-bold"> rent</span> , including
          apartments, houses, and commercial spaces. Our platform is
          user-friendly and easy to navigate, allowing you to search for
          properties based on your specific criteria.
        </div>
        <Link
          to={"/search"}
          className="text-sm sm:text-md text-blue-800 font-bold hover:underline"
        >
          Let's Start...
        </Link>
      </div>
      {/*swiper*/}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px] "
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/*listings*/}
      <div className="max-w-6xl mx-auto p-3 flex flex-col  gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl text-slate-700 font-semibold">Recent Offers</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={"/search?offer=true"}>Show more offers</Link>
            </div>
            <div className="flex flex-wrap gap-4 ">
              {
                offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))
              }
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl text-slate-700 font-semibold">Recent places for rent</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={"/search?type=rent"}>Show more places for rent</Link>
            </div>
            <div className="flex flex-wrap gap-4 ">
              {
                rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))
              }
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl text-slate-700 font-semibold">Recent places for sale</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={"/search?type=sale"}>Show more places for sale</Link>
            </div>
            <div className="flex flex-wrap gap-4 ">
              {
                saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))
              }
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
