let usage = `
  <Badge mark color="red" @click="toggleActive" :active="active">
    Annulée
  </Badge>

  <Badge mark color="gray-400" @click="toggleActive" :active="active">
    Brouillon
  </Badge>

  <Badge mark color="dark" @click="toggleActive" :active="active">
    En retard
  </Badge>

  <Badge mark color="primary" @click="toggleActive" :active="active">
    Payé
  </Badge>

  <Badge mark color="yellow" @click="toggleActive" :active="active">
    En attente
  </Badge>

  <Badge
    color="primary"
    icon="check_circle_outline"
    icon-size="10px"
    icon-color="red"
    @click="toggleActive"
    :active="active"
  >
  Done
  </Badge>

  <Badge
    color="yellow"
    icon="query_builder"
    icon-size="10px"
    icon-color="red"
    @click="toggleActive"
    :active="active"
  >
    Proccessing
  </Badge>

  <Badge
    color="red"
    icon="error_outline"
    icon-size="10px"
    icon-color="red"
    @click="toggleActive"
    :active="active"
  >
    Needs Response
  </Badge>
`.slice(1);

export default {
  usage
};
