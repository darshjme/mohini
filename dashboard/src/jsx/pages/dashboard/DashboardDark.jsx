import { useContext, useEffect } from 'react'; 
import { ThemeContext } from '../../../context/ThemeContext';
import CommanSection from './CommanSection';

const DashboardDark = () => {
	const { changeBackground,  } = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "dark", label: "Dark" });		
	}, []);
	
	return (
		<>
			<CommanSection />
		</>
	)
}
export default DashboardDark;