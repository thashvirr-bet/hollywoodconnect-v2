"use client"

import React, { useState } from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import { useRouter } from 'next/router';
import {clearProvider, setProvider} from "@/redux/features/providerSlice"
import {useDispatch, useSelector} from "react-redux"


export default function CheckCoverage() {

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
      lat:null, 
      lng:null
  });
  const [billingAddress, setBillingAddress] = useState([]);
  const [fibreProvider, setFibreProvider] = useState([])
  const [userAddress, setUserAddress] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch();

  let tempProvider = "";
  const providerArray = []

  let router = useRouter()
  
  const searchOptions = {
    componentRestrictions: { country: ['za'] }
  }

  const handleSelect = async (value) => {
    setIsLoading(true)

      const results = await geocodeByAddress(value);
      const latLng = await getLatLng (results[0]);
      

      // setBillingAddress([
      //   {
      //     "street_address": results[0].address_components[0].long_name + " " + results[0].address_components[1].long_name,
      //     "city": results[0].address_components[3].long_name,
      //   }
      // ])

      //console.log(billingAddress[0].street_address);
      //console.log(results)
      // console.log(results[0].address_components)
      // console.log(results[0].address_components[0].long_name)//house number
      // console.log(results[0].address_components[1].long_name)//street name
      // console.log(results[0].address_components[3].long_name)//City
      //console.log(coordinates.lat + "," + coordinates.lng)
      
      // console.log(results[0].address_components.filter((d) => d.long_name === "KwaZulu-Natal"))
      // const region = results[0].address_components.filter((d) => d.long_name === "KwaZulu-Natal")
      
      // console.log(region)

      // if(region[0].short_name === "KZN"){
      //   console.log("Something is happening")
      // }
      // else{
      //   console.log("No Luck cuz")
      // }
      
      //Set address of user to recoil state
      setUserAddress(value);
      setAddress(value);
      setCoordinates(latLng);
      setBtnDisabled(false);
      const response = await fetch('https://api.coverage.28east.co.za/getfeasibility?latitude='+ latLng.lat +'&longitude='+ latLng.lng +'&key=540d9880-ae2f-f3a2-2fa1-89cea1d2b663')
      const data = await response.json()

      const hfib = (data.services.find((d) => d.full_name === "Home Fibre"))
      const kznRegion = (results[0].address_components.find((d) => d.long_name === "KwaZulu-Natal"))


      if (hfib){
        const fibPro = (hfib.providers)
        
        for(let i = 0; i < fibPro.length; i++){
            

            if(fibPro[i].provider === "metrofibre" && kznRegion){
            tempProvider = "metrofibre"
            providerArray.push("metrofibre")
            dispatch(setProvider(tempProvider))
            setIsLoading(false)
            }
            else if(fibPro[i].provider === "linklayer" && kznRegion){
            tempProvider = "linklayer"
            providerArray.push("linklayer")
            dispatch(setProvider(tempProvider))
            setIsLoading(false)
            }
            else if(fibPro[i].provider === "dfa" && kznRegion){
            tempProvider = "dfa"
            dispatch(setProvider(tempProvider))
            setIsLoading(false)
            }
            else if(fibPro[i].provider === "zoomfibre" && kznRegion){
            tempProvider = "zoomfibre"
            providerArray.push("zoomfibre")
            dispatch(setProvider(tempProvider))
            setIsLoading(false)
            }
            else{
            tempProvider = "nocoverage"
            providerArray.push("nocoverage")
            }
        }
      }
      else{
        tempProvider = "nocoverage"
        providerArray.push("nocoverage")
        console.log("Nothing exists")
      }

      // setFibreProvider(tempProvider)
      setFibreProvider(providerArray)

      //Check for fibre without clicking 'Search'
      //checkNetworkCoverage()

    //   console.log(results[0].address_components)
    //   console.log(results[0].address_components.find((d) => d.long_name === "KwaZulu-Natal"))
    //   console.log(data)
    //   console.log(tempProvider)
    //   console.log(tempProvider)
    //   console.log(btnDisabled)
      // console.log("recoil: " + fibreProvider)
      // console.log("Temp provider array: " + providerArray)
      

  
  }

  const checkNetworkCoverage = async () => {
    
    //console.log(fibreProvider)
    router.push('/fibrepackages')
  } 

  return (
    <div>
        {isLoading==true ? <p>Loading...</p> : null}
        
      <div className='flex justify-center items-center w-full'>
        <div className='w-full p-8 bg-gradient-to-r from-[#AD83EA] to-[#48CBC5] rounded-lg z-[1000]'>
          <div className='flex lg:flex-row md:flex-col sm:flex-col flex-col items-center'>
            <div className='lg:w-1/2 md:w-full sm:w-full w-full text-left lg:mb-0 md:mb-2 sm:mb-2 mb-2'>
              <h3>See Packages in Your Area.</h3>
              <p>Check what internet packages are available for you</p>
            </div>
            
            <div className='lg:w-1/2 md:w-full sm:w-full w-full relative items-center'>   
              <PlacesAutocomplete searchOptions={searchOptions} value={address} onChange={setAddress} onSelect={handleSelect}>
                {( {getInputProps, suggestions, getSuggestionItemProps, loading }) => 
                  <div>            
                      <input className="block w-full p-4 pl-10 text-sm text-gray-900 rounded-full bg-gray-50" {...getInputProps({placeholder: 'Search your home address'})}/>
                      <button 
                        className="text-white absolute right-2.5 bottom-2.5 bg-hwc-darkPurple disabled:bg-[#28003e8f]" 
                        onClick={checkNetworkCoverage} disabled={btnDisabled}>
                        Search
                      </button>
                      <div className='absolute z-[1000] rounded-lg border border-[#AD83EA] bg-[#28003E]'>
                          {loading ? <div className='text-white p-6'>Loading...</div> : null}
                          {suggestions.map((suggestion) => {
                              const style = {
                                  backgroundColor: suggestion.active ? "#AD83EA" : "#FFFFFF00",
                                  color: suggestion.active ? "#ffffff" : "#ffffff",
                                  padding: "10px",
                                  cursor:"pointer"
                              };
                              return <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion, {style})}>{suggestion.description}</div>
                          })}
                      </div>
                  </div>
                }
              </PlacesAutocomplete>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
