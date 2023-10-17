export function handleServiceResult(error, data) {
  if (error) {
    const fail = {
      error,
      data: null
    }
    return fail
  }
  const success = {
    error: null,
    data
  }
  return success
}

export function handleSpecialType(response) {
  if (
    response?.headers["content-disposition"] &&
    response?.data?.type === "application/x-msdownload"
  ) {
    return {
      error: null,
      data: response.data,
      name: response.headers["content-disposition"]
    }
  } else if (response.data instanceof Blob) {
    return {
      data: response.data,
      error: null
    }
  }
  return false
}
