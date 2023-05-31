import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { currentUserCookbook } from "../../store/cookbook";

const UserCookbook = () => {
    const dispatch = useDispatch();
    const cookbooks = useSelector(state => state?.cookbook);
    const sessionUser = useSelector(state => state?.session.user);
    const userCookbook = Object.values(cookbooks)


    useEffect(() => {
        dispatch(currentUserCookbook())
    }, [dispatch])

    return (
        <div>
            {userCookbook && userCookbook.length > 0 ? (
                <div>
                    {userCookbook.map(cookbook => (

                        <div key={cookbook.id}>
                            <NavLink to={`/cookbooks/${cookbook.id}`}>
                                <h2>{cookbook.name}</h2>
                            </NavLink>
                        </div>

                    ))}
                </div>
            ) : <> no cookbook</>}
        </div>
    );
};

export default UserCookbook
