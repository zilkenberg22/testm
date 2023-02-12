import Context from "../context/Context";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Context>
                <Component {...pageProps} />
                <div id="showMessage" />
            </Context>
        </>
    );
}

export default MyApp;
