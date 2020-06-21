import React from 'react';


import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import { AutoComplete } from 'primereact/autocomplete';

const SearchComponent = props => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            // location: { lat: () => 25.064453, lng: () => 55.178806 },
            // redius: 200 * 1000
        }
    });

    const handleInput = (e) => {
        // setValue(e.target.value);
        console.log(data, e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            // panTo({ lat, lng });
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };


    return <AutoComplete
        value={value}
        suggestions={data}
        completeMethod={handleInput}
        field="Search"
        size={30}
        placeholder="Search your location"
        minLength={1}
        onChange={handleSelect}
    />;
}

export default SearchComponent;