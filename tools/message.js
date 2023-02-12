import ReactDOM from "react-dom";

export function showMessage(value) {
    const element = value.show ? <div>{value.message}</div> : "";
    ReactDOM.render(element, document.getElementById("showMessage"));
    setTimeout(() => {
        ReactDOM.render("", document.getElementById("showMessage"));
    }, 3000);
}
