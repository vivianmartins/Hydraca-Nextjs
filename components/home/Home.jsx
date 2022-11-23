import { Girl } from '../svgs/index'
import Welcome from './Welcome'

export default function Home() {
    return (
        <main className="relative h-full grid items-center">
            <Welcome />

            <Girl className="hidden scale-75 lg:block absolute -bottom-16 -right-20" />
            <img
                className="hidden scale-50 lg:block absolute -bottom-36 -left-44"
                src="/images/imageblood.png"
            />
        </main>
    )
}
