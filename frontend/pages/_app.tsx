import type {AppProps} from "next/app";

import {HeroUIProvider} from "@heroui/system";
import {ThemeProvider} from "@/components/theme-provider"
import {useRouter} from "next/router";

import {fontSans, fontMono} from "@/config/fonts";
import "@/styles/globals.css";

export default function App({Component, pageProps}: AppProps) {
    const router = useRouter();

    return (
        <HeroUIProvider navigate={router.push}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <Component {...pageProps} />
            </ThemeProvider>
        </HeroUIProvider>
    );
}

export const fonts = {
    sans: fontSans.style.fontFamily,
    mono: fontMono.style.fontFamily,
};
