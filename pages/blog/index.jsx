import Layout from '../../components/Layout';
import Link  from 'next/link';


function index({data}) {

    return (
        <Layout title="Mis Posts | mi sitio web" description="Descripcion de mi sitio web mis posts">
            <h1>Mis Posts</h1>
            {/*hacemos un destructuración en el map y en vez de item, le pongo directamente lo que quiero obtener, se debe llamar igual que en la API y asi no hace falta poner item.id, item.title... */}
            {
                data.map (({id, title, body})=> (
                    <div key={id}>
                        <h3>
                        <Link rel="stylesheet" href={`/blog/${id}`}>
                            <a>{id} - {title}</a>
                        </Link>

                        </h3>
                        <p>{body}</p>
                    </div>
                ))
            }
        </Layout>
    )
}

export default index

//con esta función estamos haciendo un sitio web estático, sirviendo desde el navegador y trayendo toda la data para sarla por props y poder pintar todos los posts
export async function getStaticProps() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await res.json()
        return {
            props: {
                data: data
            }
        }
    } catch (err) {
        console.log(err)
    }

}
