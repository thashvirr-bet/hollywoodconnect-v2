import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type InitialState = {
    value: ProviderState;
}

type ProviderState = {
    providerName: string;
}

const initialState = {
    value: {
        providerName: "",
    } as ProviderState,
} as InitialState;

export const provider = createSlice({
    name: "provider",
    initialState,
    reducers: {
        clearProvider: () => {
            return initialState;
        },
        setProvider: (state, action: PayloadAction<string>) => {
            return {
                value: {
                    providerName: action.payload,
                }
            }
        }
    }
});

export const {clearProvider, setProvider} = provider.actions;
export default provider.reducer;