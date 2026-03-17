
import { useContext, useEffect } from "react";
import CommanSection from "./CommanSection";
import { ThemeContext } from "../../../context/ThemeContext";

function Home() {
	const { changeBackground } = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
	}, []);

	return (
		<>
			<CommanSection />
		</>
	)
}
export default Home;