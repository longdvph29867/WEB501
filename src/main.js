import { render, router } from "./lib";
import ListPage from "./pages/ListPage";
import './style.css'
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import CreatePage from "./pages/CreatePage";
import Edit from "./pages/EditPage";
// Router
router.on('/', function () {
  render("#app", ListPage)
})

router.on('/create', function () {
    render("#app", CreatePage)
  })

  router.on('/edit/:id', function ({data}) {
    render("#app", () => Edit(data.id))
  })


router.resolve();

