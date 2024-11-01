import cellPhone from "../../assets/BrowseCategery/images/cellPhone.svg";

function Categories() {
  return (
    <div className="py-8 border-b-2">
      <div className="head flex gap-3 items-center pb-5">
        <div className="h-10 w-5 bg-secondary rounded-md"></div>
        <h3 className="text-red-600 PoppinsFont font-semibold">Categories's</h3>
      </div>
      <div className="Title InterFont text-4xl font-medium pb-10">
        <h3>Browser By Category</h3>
      </div>
      <div className="w-[170px] h-[145px] border-2 rounded flex flex-col justify-center items-center">
        <img src={cellPhone} alt="" className="pb-2" />
        <h1>Phones</h1>
      </div>
    </div>
  );
}

export default Categories;
