using FakeUserDataClient.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace FakeUserDataClient.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GeneratorController : ControllerBase
{
    private readonly IDataGeneratorFactory _dataGeneratorCreator;
    public GeneratorController(IDataGeneratorFactory dataGeneratorCreator)
    {
        _dataGeneratorCreator = dataGeneratorCreator;
    }

    [HttpGet("params")]
    public IActionResult GetPeopleWithQueryParameters(int page, string region, int seed, int errors)
    {
        IDataGenerator dataGenerator = _dataGeneratorCreator.ConfigureGenerator(page, region, seed);
        var people = dataGenerator.GetData(page, errors);
        return Ok(people);
    }
}
