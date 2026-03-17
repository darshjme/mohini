import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import PageTitle from '../../../layouts/PageTitle';
import { IMAGES } from '../../../constant/theme';

const lightGallery = [
	{ large: IMAGES.big1, thumb: IMAGES.big1, },
	{ large: IMAGES.big2, thumb: IMAGES.big2, },
	{ large: IMAGES.big3, thumb: IMAGES.big3, },
	{ large: IMAGES.big4, thumb: IMAGES.big4, },
	{ large: IMAGES.big5, thumb: IMAGES.big5, },
	{ large: IMAGES.big6, thumb: IMAGES.big6, },
	{ large: IMAGES.big7, thumb: IMAGES.big7, },
	{ large: IMAGES.big8, thumb: IMAGES.big8, },
];

function Lightgallery() {
	return (
		<>
			<PageTitle activeMenu="Light Gallery" motherMenu="Plugins" />
			<div className="row">
				<div className="col-lg-12">
					<div className="card">
						<div className="card-header">
							<h4 className="card-title"> Light Gallery</h4>
						</div>
						<div className="card-body pb-1">
							<LightGallery
								speed={500}
								plugins={[lgThumbnail, lgZoom]}
								elementClassNames="row"
							>
								{lightGallery.map((item, index) => (
									<div data-src={item.thumb} className="col-lg-3 col-md-6 mb-4" key={index}>
										<img src={item.thumb} style={{ width: "100%" }} alt="gallery" className='cursor-pointer' />
									</div>
								))}
							</LightGallery>
						</div>
					</div>
				</div>
			</div>
		</>
	) 
}
export default Lightgallery;