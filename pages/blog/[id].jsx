import Layout from '../../components/Layout';


function misPosts({data}) {
    return (
        <Layout title="Mis Posts | mi sitio web" description="Descripcion de mi sitio web mis posts">
        <h1>{data.id} - {data.title}</h1>
        <p>{data.body}</p>
    </Layout>
    )
}

export default misPosts

//con este map lo que estamos haciendo es cerar un id.jsx por cada post que haya, es decir 1.jsx, 2.jsx... , al porne rel id entre back-ticks, hacemos que lo convierta a texto plano y no de error, ya que el id es un número
export async function getStaticPaths() {
    try {
        const res = await fetch ('https://jsonplaceholder.typicode.com/posts')
        const data = await res.json ()
        const paths = data.map(({id}) => (
            {params: { id:`${id}` }}
        ))
        return {
            paths,
            fallback:false
        }

    }catch (err) {
        console.log(err);
    }
}

//con esta función estamos haciendo un sitio web estático, sirviendo desde el navegador y trayendo toda la data para sarla por props y poder pintar todos los posts
export async function getStaticProps({params}) {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
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
