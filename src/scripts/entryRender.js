// rendering function stored in entryRender.  Accepts an element and component argument, targets element, and appends stuff to that element conatiner

const entryRender = (element, components) => {
  const $container = $(`#${element}`)
  $container.empty().append(components)

}