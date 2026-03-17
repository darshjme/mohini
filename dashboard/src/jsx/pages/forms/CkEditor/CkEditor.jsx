import PageTitle from '../../../layouts/PageTitle';
import CkEditorBlog from '../../../element/ckeditercard';
function CkEditor() {
    return (
        <>
            <PageTitle activeMenu="CkEditor" motherMenu="Form" />
            <div className="row">
                <div className="col-xl-12 col-xxl-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Form CkEditor</h4>
                        </div>
                        <div className="card-body custom-ekeditor">
                            <div id="ckeditor" >
                                <CkEditorBlog />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CkEditor; 