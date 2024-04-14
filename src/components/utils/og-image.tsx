import React from "react";

type Props = {
    date: string;
    name: string;
    description?: string;
    icon?: string;
    image?: string;
};

const OGImage: React.FC<Props> = ({ date, name, description, icon, image }) => {
    const showBrand = false;

    return <div
        style={{
            display: "flex",
            height: "100%",
            width: "100%",
            padding: "20px",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundImage: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
            fontFamily: "Noto Sans",
            fontSize: 100,
            fontWeight: 700,
            letterSpacing: -2,
            textAlign: "center",
        }}
    >
        <div
            style={{
                backgroundImage: "linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))",
                backgroundClip: "text",
                color: "transparent",
                fontSize: 60
            }}
        >
            {date}
        </div>
        <div
            style={{
                backgroundImage: "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
                backgroundClip: "text",
                color: "transparent",
                margin: "20px"
            }}
        >
            {limitTextLength(name, description ? 15 : 30)}
        </div>
        {description &&
            <div
                style={{
                    backgroundImage: "linear-gradient(90deg, rgb(255, 77, 77), rgb(249, 203, 40))",
                    backgroundClip: "text",
                    color: "transparent",
                    fontSize: 60,
                }}
            >
                {limitTextLength(description, 50)}
            </div>
        }
        {icon &&
            <div
                style={{
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "175px",
                    height: "175px",
                    right: "50px",
                    top: "50px",
                    backgroundColor: "white",
                    borderRadius: "25px",
                    fontSize: 125
                }}
            >
                {icon}
            </div>
        }
        {showBrand &&
            <div
                style={{
                    position: "absolute",
                    bottom: "25px",
                    padding: "10px 25px",
                    color: "rgba(0, 0, 0, .8)",
                    fontSize: 35,
                    backgroundColor: "white",
                    borderRadius: "20px",
                }}
            >
                savedate.app
            </div>
        }
    </div>;
};

const limitTextLength = (text: string, length: number) => {
    return text.length > length ? `${text.substring(0, length)} ...` : text;
};

export default OGImage;
