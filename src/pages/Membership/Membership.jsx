import { Link } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle/SectionTitle";


const Membership = () => {
    return (
        <div>
            <SectionTitle heading="Become a member" subHeading="Payment"></SectionTitle>
            <h2 className="text-2xl text-center">Pay subscription fee to become a member and earn gold badge</h2>
            <div className="flex gap-20 mt-5 justify-center mb-5">
                <p className="text-xl">Subscription fee: $100</p>
                <Link to="/payment">
                    <button className="btn btn-md btn-primary">Pay</button>
                </Link>
            </div>
        </div>
    );
};

export default Membership;