import { ImageResponse } from '@vercel/og';
import type { VercelRequest } from '@vercel/node';

export const config = {
    runtime: 'edge',
};

// See https://vercel.com/docs/functions/og-image-generation
export default async function handler(request: VercelRequest) {
    try {
        const { searchParams } = new URL(request.url ?? String());
        const { date, name, description, icon } = Object.fromEntries(searchParams.entries());

        const fontData = await fetch(
            new URL('../assets/NotoSans-Bold.ttf', import.meta.url),
        ).then((res) => res.arrayBuffer());

        return new ImageResponse(
            (
                <div
                    style={{
                        display: 'flex',
                        height: '100%',
                        width: '100%',
                        padding: '20px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
                        fontFamily: '"Noto Sans"',
                        fontSize: 100,
                        fontWeight: 700,
                        letterSpacing: -2,
                        textAlign: 'center',
                    }}
                >
                    <div
                        style={{
                            backgroundImage: 'linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))',
                            backgroundClip: 'text',
                            color: 'transparent',
                            fontSize: 60
                        }}
                    >
                        {date ?? "no-date-specified"}
                    </div>
                    <div
                        style={{
                            backgroundImage: 'linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))',
                            backgroundClip: 'text',
                            color: 'transparent',
                            margin: '20px'
                        }}
                    >
                        {name ?? "no-name-specified"}
                    </div>
                    {description &&
                        <div
                            style={{
                                backgroundImage: 'linear-gradient(90deg, rgb(255, 77, 77), rgb(249, 203, 40))',
                                backgroundClip: 'text',
                                color: 'transparent',
                                fontSize: 60,
                            }}
                        >
                            {description}
                        </div>
                    }
                    <div
                        style={{
                            marginTop: '50px',
                            padding: '10px 25px',
                            color: 'rgba(0, 0, 0, .8)',
                            fontSize: 35,
                            backgroundColor: 'white',
                            borderRadius: '10px',
                        }}
                    >
                        savedate.app
                    </div>
                    {icon &&
                        <div
                            style={{
                                position: 'absolute',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '150px',
                                height: '150px',
                                right: '35px',
                                top: '35px',
                                backgroundColor: 'white',
                                borderRadius: '35px',
                                fontSize: 100
                            }}
                        >
                            {icon}
                        </div>
                    }
                </div>
            ),
            {
                width: 1200,
                height: 630,
                emoji: 'twemoji',
                fonts: [
                        {
                        name: 'Noto Sans',
                        data: fontData,
                        weight: 700
                    }
                ],
            },
        );
    } catch (e: any) {
        return new Response('Failed to generate the image', {
            status: 500,
        });
    }
}
