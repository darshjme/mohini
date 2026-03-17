import { Link } from 'react-router-dom';
import MainContent from '../../components/aikit/MainContent';
import TopMenus from '../../components/aikit/TopMenus';
import { SVGICON } from '../../constant/theme';
import { useDropzone } from 'react-dropzone';

function Import() {
    const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
        noClick: true,
        noKeyboard: true
      });
   
      const files = acceptedFiles.map(file => (
        <li key={file.path}>          
          {file.path}
        </li>
      ));
    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <MainContent detail="This is a demo of AIKit plugin made for you to test the experience of using the plugin." />
                    <TopMenus id={9} />
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="heading">Export Settings</h4>
                                    <p>Download the current settings and prompts as a json file.</p>
                                    <ul className="setting-list">
                                        <li className="mb-2"> {SVGICON.downloadsvg} <Link to={"#"} className="text-primary ms-2">Export All Settings + Prompts</Link> </li>
                                        <li> {SVGICON.downloadsvg} <Link to={"#"} className="text-primary ms-2"> Export Prompts only</Link> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="heading">Import Settings</h4>
                                    <p>Upload a settings json file to import settings and/or prompts.</p>
                                    <div className="dz-default mb-3"> 
                                        <div {...getRootProps({className: 'dropzone upload-img text-center dz-clickable p-3'})}>
                                                        <input {...getInputProps()} />
                                                        <div className="dlab-message"
                                                            style={{
                                                                textAlign: "center",
                                                                margin: "5em 0"
                                                            }}
                                                        >
                                                            {SVGICON.dropdownload}
                                                            <p type="button" onClick={open}>Drop file here to upload</p>
                                                            <ul>{files}</ul>
                                                        </div>
                                                    </div>  
                                        <small><strong className="text-black">Important:</strong> It's highly recommended to backup your current settings before importing new settings, so you can revert back if needed.</small>
                                    </div>
                                    <button type="button" className="btn btn-primary">Import Settings</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}; 
export default Import;