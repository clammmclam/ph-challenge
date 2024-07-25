import "./App.css";
import { createTheme, ScopedCssBaseline, ThemeProvider } from "@mui/material";
import CustomRoutes from "./CustomRoutes";
import { Provider } from "react-redux";
import store from "./redux/store";

const theme = createTheme({
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#484848",
    },
    piction: {
      background: "#eaeaea",
      text: "#6c6c72",
      white: "#fff",
    },
    grayTones: {
      main: "#636363",
      light: "#eeeeee",
      lighter: "#f5f5f5",
      ultralight: "#fafafa",
    },
  },
  spacing: 8,
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ScopedCssBaseline>
          <CustomRoutes />
        </ScopedCssBaseline>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
